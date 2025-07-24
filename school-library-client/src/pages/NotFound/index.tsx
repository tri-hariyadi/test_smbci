import NotFoundImg from 'assets/404.png';
import { Button } from 'components';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-28 place-items-center h-svh xl:min-w-7xl min-w-full xl:max-w-7xl">
        <div className="hidden md:block">
          <img src={NotFoundImg} alt="Not found page" className="w-full" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[250px] font-inter-bold text-[#4A5C74]">404</h2>
          <span className="self-start inline-block mb-4 text-xl font-inter-semibold text-[#4C4C4C]">
            Ahaa! You See! You can be wrong! <span className="block text-neutral-400">(or it could be us)</span>
          </span>
          <span className="self-start text-xl font-inter-semibold text-[#4C4C4C]">
            The page is not found, either way you should probably
          </span>
          <Button
            type="link"
            href="/"
            variant="text"
            className="underline self-start text-xl font-inter-semibold mt-1 text-[#336698]"
          >
            go back to the homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
