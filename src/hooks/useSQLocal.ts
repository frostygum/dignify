import { ref } from 'vue'
import { client, filename } from '@/plugins/sqlocal/client';
import { DrizzleQueryError } from 'drizzle-orm';

export interface ResultSQLocal {
  isSelect: boolean,
  rows?: unknown[],
  cols?: unknown[]
}

export interface ErrorSQLocal {
  message?: string,
  cause?: string
}

export const useSQLocal = () => {
  const isExecuting = ref(false);
  const errorMessage = ref<ErrorSQLocal>();

  const execute = (syntax: string) => {
    const cleanedSyntax = syntax.trim().toLowerCase();
    const isSelect = /.*select.*/i.test(cleanedSyntax);

    isExecuting.value = true;
    errorMessage.value = undefined;

    if (isSelect) {
      return new Promise((resolve: (value: ResultSQLocal) => void) => {
        client
          .all(cleanedSyntax)
          .then((res) => {
            resolve({
              isSelect: true,
              rows: res
            });
          })
          .catch((e) => {
            errorMessage.value = {};
            if (e instanceof DrizzleQueryError) {
              errorMessage.value.message = e.message;
              errorMessage.value.cause = e.cause ? String(e.cause) : undefined;
            } else {
              errorMessage.value.message = String(e);
            }
          })
          .finally(() => {
            isExecuting.value = false;
          })
      })
    } else {
      return new Promise((resolve: (value: ResultSQLocal) => void) => {
        client
          .run(cleanedSyntax)
          .then((res) => {
            resolve({
              isSelect: false,
              rows: res.rows
            });
          })
          .catch((e) => {
            errorMessage.value = {};
            if (e instanceof DrizzleQueryError) {
              errorMessage.value.message = e.message;
              errorMessage.value.cause = e.cause ? String(e.cause) : undefined;
            } else {
              errorMessage.value.message = String(e);
            }
          })
          .finally(() => {
            isExecuting.value = false;
          })
      })
    }
  }

  return {
    filename,
    isExecuting,
    errorMessage,
    execute
  }
}
