import React from 'react';
import { useGetCategoriesQuery } from '../../Services/Post';
import Category from '../../Components/Category';

const Categories: React.FC = () => {
  const { data } = useGetCategoriesQuery(undefined);

  return (
    <section className="tags">
      {(data || []).map((c) => <Category key={c.slug} {...c} />)}
    </section>
  );
};

export default Categories;
