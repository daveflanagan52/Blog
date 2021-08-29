import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faGlobe, faTags, faUser,
} from '@fortawesome/free-solid-svg-icons';

import { useGetPostQuery } from '../../Services/Post';

import Container from '../../Components/Container';
import Loader from '../../Components/Loader';
import Comment from '../../Components/Comment';
import { Comment as CommentType } from '../../Types';
import RandomPosts from '../../Components/RandomPosts';

type PostParams = {
  post: string;
};

const Post: React.FC = () => {
  const { post } = useParams<PostParams>();
  const { data, isLoading } = useGetPostQuery(post);

  return (
    <>
      <Helmet>
        <title>Dave &amp; Suvi | {data?.name || 'Post'}</title>
      </Helmet>
      <Loader show={isLoading} />

      <Container>
        <section className="posts">
          <div className="card card-post">
            <h1 className="title mb-4">{data?.name}</h1>
            <div className="card-meta top">
              <span className="posted-on">
                <FontAwesomeIcon icon={faClock} />
                <Moment date={data?.createdAt} format="dddd, Do MMMM YYYY" />
              </span>
              <span className="d-none d-lg-inline-block categories">
                <FontAwesomeIcon icon={faTags} />
                {data?.categories?.map((c) => <Link key={c.slug} to={`/category/${c.slug}`}>{c.name}</Link>)}
              </span>
              <span className="d-none d-lg-inline-block author">
                <FontAwesomeIcon icon={faUser} />
                {data?.author.name}
              </span>
              <Link to={`/country/${(data?.country?.code || 'fi').toLowerCase()}`} className="d-none d-lg-inline-block country">
                <FontAwesomeIcon icon={faGlobe} />
                {data?.country?.name}
              </Link>
            </div>
            <img alt={data?.name} src={data?.thumbnail} className="card-img-top mb-4" />
            <div className="card-body">
              {(data?.components || []).slice().sort((a, b) => a.order - b.order).map((component) => {
                switch (component.type) {
                  case 'text':
                    return (<p>{component.content}</p>);
                  case 'image':
                    return (<img src={component.content} width={component?.width || 'auto'} className={'img-fluid float-md-' + (component.align || 'none')} />);
                  case 'video':
                    return (<div className="ratio ratio-16x9 mb-4"><iframe src={`https://www.youtube.com/embed/${component.content}?rel=0`} title="YouTube video" allowFullScreen /></div>);
                }
              })}
            </div>
          </div>
        </section>

        <section className="comments">
          <h2 className="title mb-4">
            Comments (
            {(data?.comments || []).length}
            )
          </h2>
          {(data?.comments || []).map((c: CommentType) => <Comment key={c.id} {...c} />)}

          <h2 className="title mb-4">Leave a Comment</h2>
          <form method="post">
            <p>Your email address will not be published. All fields are required.</p>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">Comment</label>
              <textarea className="form-control" id="comment" name="content" rows={8} />
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" />
              </div>
              <div className="col-6">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" name="email" />
              </div>
            </div>
            <div className="d-flex">
              <button type="submit" className="btn btn-primary ms-auto mb-3">Submit</button>
            </div>
          </form>
        </section>

        <RandomPosts exclude={data?.id || -1} />
      </Container>
    </>
  );
};

export default Post;