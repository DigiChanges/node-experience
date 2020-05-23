class MyApi {
    public getName(): string {
        return "MyApi";
    }
}

describe("MyApi getName function return value", () => {
    it("Should be defined.", () => {
        const myApi = new MyApi();
        expect(myApi.getName()).toBeDefined("The function getName() should be defined.");
    });

    it("Should return 'MyName'", () => {
        const myApi = new MyApi();
        expect(myApi.getName()).toEqual("MyApi", "The function getName() should return MyApi.");
    });

    it("Should't return blank." , () => {
        const myApi = new MyApi();
        expect(myApi.getName()).not.toEqual("");
    });

} );