'use client';

import React from 'react';

interface FormProps {
  url: string;
}

const Form = ({ url }: FormProps) => {
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        const file = (e.target as HTMLFormElement).file.files?.[0]!;

        const image = await fetch(url, {
          body: file,
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
            'Content-Disposition': `attachment; filename="${file.name}"`,
          },
        });

        window.location.href = image.url.split('?')[0];
      }}
    >
      <input name='file' type='file' accept='image/png, image/jpeg' />
      <button type='submit'>Upload</button>
    </form>
  );
};

export default Form;
