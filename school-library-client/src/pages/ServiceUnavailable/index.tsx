import Unavailable from 'assets/500.png';
import { Button } from 'components';

const ServiceUnavailable = () => {
  return (
    <div className="w-svw h-svh flex flex-col justify-center items-center">
      <img src={Unavailable} alt="service unavailable" className="w-130 h-130" />
      <h2 className="text-lg font-inter-medium">The server is temporarily busy, try again later!</h2>
      <Button
        type="link"
        href="/"
        variant="text"
        className="underline self-center text-xl font-inter-semibold mt-1 text-[#336698]"
      >
        go back to the homepage
      </Button>
    </div>
  );
};

export default ServiceUnavailable;
