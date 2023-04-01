import Stories from "../components/Stories";
import WidgetA from "../components/WidgetA";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth/AuthContext";
import { useContext, useState } from "react";
import { PostContext } from "../components/Auth/PostContext";
import PostBox from "../components/PostBox";
import ReactPaginate from "react-paginate";

const HomePage = () => {
  const navigate = useNavigate();
  const dataImg =
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80";
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { posts, setPosts } = useContext(PostContext);

  const { currentUser, isLoading } = useContext(AuthContext);

  const [pageNumber, setPageNumber] = useState(0);

 

  return (
    <div className="container">
      <section className="stories">
        {posts && (
          <Slider {...settings}>
            {[...posts].reverse().map((post, i) => {
              return (
                <Stories
                  imageUrl={post.featureImg}
                  key={i}
                  title={post.title}
                  author={post.author}
                  summary={post.summary}
                />
              );
            })}
          </Slider>
        )}
      </section>
      <section className="content-container">
        <section className="post-archive">
          {posts
             .map((post) => (
              <PostBox key={post.id} posts={posts} setPosts={setPosts} />
            ))}

 
        </section>
        <aside className="sidebar">
          <div id="sidebar-a">
            <WidgetA
              isLoading={isLoading}
              currentUser={currentUser}
              navigate={navigate}
            />
          </div>
        </aside>
      </section>
      <button className="float-btn">
        {" "}
        <DesignServicesIcon
          style={{
            color: "white",
            backgroundColor: "transparent",
            cursor: "pointer",
            borderRadius: "100%",
            fontSize: "25",
            fontWeight: "bold",
            width: "30px",
            height: "30px",
          }}
          onClick={() => navigate("post")}
        />
      </button>
    </div>
  );
};

export default HomePage;
