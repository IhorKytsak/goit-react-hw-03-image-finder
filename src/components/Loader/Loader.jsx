import { Oval } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Oval
      wrapperStyle={{ margin: '20px auto' }}
      color="#00BFFF"
      height={80}
      width={80}
    />
  );
};

export default Loader;
