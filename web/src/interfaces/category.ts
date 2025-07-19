export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CategoryProps {
  category: Category;
}

export interface CategorySelectProps {
  category?: string;
  isValidCategory: boolean;
  categories: Category[];
  onSelect: (name: string) => void;
  navigateOnSelect?: boolean;
}

export interface CategoryBannerProps {
  category?: string;
  isValidCategory: boolean;
}
