import {AxiosFactory} from "../Lib/Factories/AxiosFactory";
import {DataResponse} from "../Lib/DataReponse";
import "jasmine";


describe("Server", () => {
    let dataResponse: DataResponse = new DataResponse();
    beforeAll(() => {
        spyOn(console, 'log').and.callThrough();
    });

    describe("LOGIN POST /", () => {

        beforeAll(async () => {

            const payload = {
                "email": "user@node.com",
                "password": "12345678"
            };

            const instance = AxiosFactory.getAxiosInstance(false);

            await instance.post("auth/login", payload)
                .then((res)=>{
                    console.log("Success");
                    dataResponse.setStatus(res.status);
                    dataResponse.setData(res.data);
                }).catch((error)=>{
                    console.log("Error");
                    dataResponse.setError({isFailed: true, message: error});
            });
        });
        it("Status 201", () => {
            expect(dataResponse.getStatus()).toEqual(201);
        });
        it("Expected user email", () => {
            let {data} = dataResponse.getData();

            expect(data.user.email).toEqual("user@node.com");
            expect(data.user.firstName).toEqual("node");
        });
    });
});