const Deque = require("./deque");

let deque;

beforeEach(function() {
  deque = new Deque();
});

describe("addFirst", function() {
  it("places the value at the beginning of the deque and returns undefined", function() {
    expect(deque.addFirst(10)).toBe(undefined);
    expect(deque.first.val).toBe(10);
    expect(deque.last.val).toBe(10);
    deque.addFirst(100);
    expect(deque.first.val).toBe(100);
    expect(deque.last.val).toBe(10);
    deque.addFirst(1000);
    expect(deque.first.val).toBe(1000);
    expect(deque.last.val).toBe(10);
  });
});

describe("addLast", function() {
    it("places the value at the end of the deque and returns undefined", function() {
      expect(deque.addLast(10)).toBe(undefined);
      expect(deque.first.val).toBe(10);
      expect(deque.last.val).toBe(10);
      deque.addLast(100);
      expect(deque.first.val).toBe(10);
      expect(deque.last.val).toBe(100);
      deque.addLast(1000);
      expect(deque.first.val).toBe(10);
      expect(deque.last.val).toBe(1000);
    });
  });

describe("popFirst", function() {
  it("returns the value of the node removed from the beginning", function() {
    deque.addLast(10);
    deque.addLast(100);
    deque.addLast(1000);
    let removed = deque.popFirst();
    expect(removed).toBe(10);
    expect(deque.size).toBe(2);
    deque.popFirst();
    deque.popFirst();
    expect(deque.size).toBe(0);
  });

  it("throws an error if the deque is empty", function() {
    expect(() => deque.popFirst()).toThrow(Error);
  });
});

describe("popLast", function() {
    it("returns the value of the node removed from the end", function() {
      deque.addLast(10);
      deque.addLast(100);
      deque.addLast(1000);
      let removed = deque.popLast();
      expect(removed).toBe(1000);
      expect(deque.size).toBe(2);
      deque.popLast();
      deque.popLast();
      expect(deque.size).toBe(0);
    });
  
    it("throws an error if the deque is empty", function() {
      expect(() => deque.popLast()).toThrow(Error);
    });
  });

describe("peekFirst", function() {
  it("returns the value at the start of the deque", function() {
    deque.addFirst(3);
    expect(deque.peekFirst()).toBe(3);
    deque.addFirst(5);
    expect(deque.peekFirst()).toBe(5);
    deque.addLast(7);
    expect(deque.peekFirst()).toBe(5);
  });
});

describe("peekLast", function() {
    it("returns the value at the end of the deque", function() {
      deque.addFirst(3);
      expect(deque.peekLast()).toBe(3);
      deque.addFirst(5);
      expect(deque.peekLast()).toBe(3);
      deque.addLast(7);
      expect(deque.peekLast()).toBe(7);
    });
  });

describe("isEmpty", function() {
  it("returns true for empty deque", function() {
    expect(deque.isEmpty()).toBe(true);
  });

  it("returns false for nonempty deque", function() {
    deque.addFirst(3);
    expect(deque.isEmpty()).toBe(false);
  });
});
