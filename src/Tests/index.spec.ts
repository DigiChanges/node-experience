import {request} from "./setup";

describe("Test the root path", () => {
  it("It should response the GET method", async done => {
    const response: any = await request.get("/");
    expect(response.statusCode).toBe(200);
    done();
  });
});