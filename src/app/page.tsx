import { generateS3URL } from '@/actions/generateS3URL';

import Form from './form';

const Home = async () => {
  const url = await generateS3URL();

  return (
    <main>
      <Form url={url} />
    </main>
  );
};

export default Home;
