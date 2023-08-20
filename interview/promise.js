//promise
function MyPromise() {
  this.state = "";
  this.resolves = [];
  this.rejects = [];
  this.resolve = function (fn) {
    if (this.state === "pending") {
      this.state = "fullfilled";
    }
    this.resolves.push(fn);
  };
  this.reject = function (fn) {
    if (this.state === "pending") {
      this.state = "rejected";
    }
    this.rejects.push(fn);
  };
  this.then = function (OnResolved, OnRejected) {
    let self = this;
    let promise2;

    OnResolved =
      typeof OnResolved === "function"
        ? OnResolved
        : function (res) {
            return res;
          };
    OnRejected =
      typeof OnRejected === "function"
        ? OnRejected
        : function (err) {
            throw err;
          };

    if (self.status === "resolved") {
      return (promise2 = new Promise(function (resolve, reject) {
        try {
          const x = OnResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      }));
    }
    if (self.status === "rejected") {
      return (promise2 = new Promise(function (resolve, reject) {
        try {
          const x = OnRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          reject(x);
        } catch (e) {
          reject(e);
        }
      }));
    }

    if (self.status === "pending") {
      return (promise2 = new Promise((resolve, reject) => {
        self.resolves.push(function (v) {
          try {
            const x = OnResolved(v);
            if (x instanceof Promise) {
              x.then(resolve, reject);
            }
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });

        self.rejects.push(function (e) {
          try {
            const x = OnRejected(e);
            if (x instanceof Promise) {
              x.then(resolve, reject);
            }
            reject(e);
          } catch (e) {
            reject(e);
          }
        });
      }));
    }

    return new Promise();
  };
  this.catch = function (OnRejected) {
    return this.then(null, OnRejected);
  };
}
