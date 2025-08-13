import { useParams } from "react-router-dom";
import QuickViewPage from "./QuickView"; // ya QuickViewPage
import { products } from "../HomePagemain/FeaturedProducts"; // ya jahan se data aa raha ho

const QuickViewRoute = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return <QuickViewPage product={product} onClose={() => window.history.back()} />;
};

export default QuickViewRoute;
