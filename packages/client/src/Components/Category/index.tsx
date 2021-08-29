import React from 'react';
import Button, { ButtonType } from '../Button';
import { Category as CategoryType } from '../../Types';

const Category: React.FC<CategoryType> = ({
  name, slug, description, thumbnail,
}) => (
  <div className="tag">
    <div className="content">
      <div className="title h3">{name}</div>
      <div className="description">{description}</div>
      <div className="action">
        <Button type={ButtonType.Light} link={`/category/${slug}`} text="View More" />
      </div>
    </div>
    <Button type={ButtonType.Link} link={`/category/${slug}`} text="" />
    <div className="media">
      <img alt={name} src={thumbnail} />
    </div>
  </div>
);

export default Category;
