import React from 'react';
import Link from 'next/link';

interface Props {
  content: string;
}

const ContentLink = ({ content }: Props) => {
  return (
    <div>
      {content.split(/(#[^\s#@]+|@[^\s#@]+)/g).map((v, index) => {
        // ํ๊ทธ
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link key={index} href={`/tags/${v.slice(1)}`}>
              <a>{v}</a>
            </Link>
          );
        }

        // ์ ์ 
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
