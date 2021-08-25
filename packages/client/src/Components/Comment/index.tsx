import React from 'react';
import Moment from 'react-moment';

import { Comment as CommentType } from '../../Types';

const Comment = ({
  name, content, avatar, createdAt,
}: CommentType) => (
  <article className="comment mb-4">
    <div className="avatar">
      <img src={avatar} width="56" height="56" alt={name} />
    </div>
    <div className="body">
      <div className="meta">
        <span className="author">
          {name}
          {' '}
          <span className="sr-only">says:</span>
        </span>
        <span className="posted-on"><Moment date={createdAt} /></span>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
    </div>
  </article>
);

export default Comment;
