export interface Category {
  id?: string;
  name: string;
  imageUrl: string;
  parent?: string | Category;
  sortOrder: number;
  isActive: boolean;
}
