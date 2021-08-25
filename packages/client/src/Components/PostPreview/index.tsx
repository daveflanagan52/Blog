import React from 'react';
import Moment from 'react-moment';

import Button, { ButtonType } from '../Button';
import { Post as PostType } from '../../Types';

function shorten(text: string, max: number) {
  const trimmed = text.replace(/\[\/?(?:p|img|dc|video)*?.*?\]/img, '').substr(0, max);
  return `${trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))}...`;
}

const PostPreview = ({
  name, slug, thumbnail, content, createdAt,
}: PostType) => (
  <div className="card card-post mb-4">
    <img alt={name} src={thumbnail} className="card-img-top" />
    <div className="card-meta">
      <span className="posted-on"><Moment date={createdAt} format="dddd, Do MMMM YYYY" /></span>
    </div>
    <div className="card-body">
      <h3 className="title">{name}</h3>
      <div className="excerpt">{shorten(content, 150)}</div>
      <Button link={`/post/${slug}`} type={ButtonType.Primary} text="Read More" />
    </div>
    <Button link={`/post/${slug}`} type={ButtonType.Link} text="" />
  </div>
);

export default PostPreview;
