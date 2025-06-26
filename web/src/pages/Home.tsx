import { Header } from '../components/Header';
import { ProfileSection } from '../components/ProfileSection';
import { Categories } from '../components/Categories';
import { useEffect, useState } from 'react';
import { CategoryInterface } from '../interfaces/category';
import { categoriesService } from '../services/categoryServices';

export const Home = () => {
  const [getCategory, setGetCategory] = useState<CategoryInterface[]>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchProductByCategory = async () => {
      try {
        setLoading(true);
        const allCategories = await categoriesService.getAllCategories()
        setGetCategory(allCategories || [])

      } catch (error) {
        console.error("Error al obtener los productos por categoria:", error);
        setGetCategory([])

      } finally {
        setLoading(false);
      }
    };

    fetchProductByCategory();
  }, []);

  return (
    <section>
      <Header />
      <ProfileSection />
      <section className='mt-4'>
        <Categories
          categories={getCategory || []}
          loading={loading}
        />
      </section>
    </section>
  );
};
