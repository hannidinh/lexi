import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { booksRouter } from "@/modules/books/server/procedures";
import { tagsRouter } from "@/modules/tags/server/procedures";
import { tenantsRouter } from "@/modules/tenants/server/procedures";
import { checkoutRouter } from "@/modules/checkout/server/procedures";
import { libraryRouter } from "@/modules/library/server/procedures";
import { reviewsRouter } from "@/modules/reviews/server/procedures";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  library: libraryRouter,
  checkout: checkoutRouter,
  books: booksRouter,
  categories: categoriesRouter,
  reviews: reviewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
