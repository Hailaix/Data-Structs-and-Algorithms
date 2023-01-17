const LinkedList = require("./linked-list");
const reverseInPlace = require("./reverseInPlace");
describe("revese tests", () => {
    it("should reverse the list", () => {
        const list = new LinkedList([1,2,3,4,5]);
        reverseInPlace(list);
        expect(list.head.val).toBe(5);
        expect(list.tail.val).toBe(1);
    })
})