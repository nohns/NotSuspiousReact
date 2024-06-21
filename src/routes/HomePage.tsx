import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="py-64 flex flex-col items-center gap-4">
      <h1 className="text-5xl font-extrabold">
        Velkommen til FED autoværksted
      </h1>
      <p>Den bedste service i byen. Book en ny aftale i dag!</p>
      <Button asChild>
        <Link to="/book">
          Book her <ArrowRightIcon className="h-5 w-5 ml-2" />
        </Link>
      </Button>
    </div>
  );
}

export default HomePage;
