import React from 'react';
import Link from 'next/link';

const ContentLink = ({ content }) => {
  return (
    <div>
      {content.split(/(#[^\s#@]+|@[^\s#@]+)/g).map((v, index) => {
        // 태그
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link key={index} href={`/tags/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }

        // 유저
        if (v.match(/(@[^\s@]+)/)) {
          return (
            <Link key={index} href={`/profile/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }

        return v;
      })}
    </div>
  );
};

export default ContentLink;
