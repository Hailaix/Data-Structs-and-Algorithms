const LinkedList = require("./linked-list");
const mergeSortedLists = require("./mergeSortedLists");

describe("combines two linked lists", () => {
    it("should successfully merge two LLs", () => {
        const a = new LinkedList([1,2,4,5]);
        const b = new LinkedList([3,6,7]);
        const c = mergeSortedLists(a,b);
        expect(c.length).toBe(7);
        expect(c.head.val).toBe(1);
        expect(c.tail.val).toBe(7);
        expect(c.getAt(2)).toBe(3);
        expect(c.getAt(4)).toBe(5);
    })
})