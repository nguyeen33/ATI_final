// Reorganize pages in the app directory
import { rename } from 'fs/promises';
import { join } from 'path';

async function migratePagesToRoot() {
  const rootDir = 'app/(root)';
  const pages = ['dashboard', 'billing', 'settings'];
  
  for (const page of pages) {
    try {
      await rename(
        join('app', page),
        join(rootDir, page)
      );
      console.log(`Successfully moved ${page} to ${rootDir}`);
    } catch (error) {
      console.error(`Error moving ${page}:`, error);
    }
  }
}

migratePagesToRoot();