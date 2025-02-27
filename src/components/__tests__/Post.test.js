import {default as Post} from "@components/Post";
import { render } from "@testing-library/react";

//Test Should
describe("Post component", () => {
  test("should renders the fullName correctly", () => {
    const { getByText } = render(
      <Post
        fullName={"This is my name"}
        createdAt={Date.now()}
        content="Is render"
      />,
    );

    expect(getByText("This is my name")).toBeInTheDocument();
  });

  test("should renders the content correctly", () => {
    const { getByText } = render(
      <Post
        fullName={"This is my name"}
        createdAt={Date.now()}
        content="Is render"
      />,
    );

    expect(getByText("Is render")).toBeInTheDocument();
  });

  test("display number likes is correctly", () => {
    const likes = [1,2,3,4]
    const { getByText } = render(
      <Post
        fullName={"This is my name"}
        createdAt={Date.now()}
        content="Is render"
        likes={likes}
      />,
    );

    expect(getByText("4")).toBeInTheDocument();
  });

});
