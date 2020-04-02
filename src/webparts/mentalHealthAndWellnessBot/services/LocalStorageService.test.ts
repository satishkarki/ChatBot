import "jest";
import { expect } from "chai";

import LocalStorageService from "./LocalStorageService";

/* tslint:disable:no-function-expression */
/* tslint:disable:only-arrow-functions */
/* tslint:disable:no-unused-expression */
/* tslint:disable:no-empty */
/* tslint:disable:typedef */

describe("LocalStorageService", function(): void {
  describe("getHasTeachingBubbleBeenDismissed", function(): void {
    it("should return false when nothing has been set or saved to local storage", function() {
      expect(LocalStorageService.getHasTeachingBubbleBeenDismissed()).to.be.false;
    });

    it("should return true when value from local storage is true", function() {
      // set local storage
      localStorage.setItem(LocalStorageService.TEACHING_BUBBLE_LOCAL_STORAGE_KEY, "true");

      expect(LocalStorageService.getHasTeachingBubbleBeenDismissed()).to.be.true;
    });
  });

  describe("setHasTeachingBubbleBeenDismissed", function(): void {
    it("should set hasTeachingBubbleBeenDismissed to true when passed true", function(): void {
      LocalStorageService.setHasTeachingBubbleBeenDismissed(true);

      expect(LocalStorageService.getHasTeachingBubbleBeenDismissed()).to.be.true;
    });

    it("should set hasTeachingBubbleBeenDismissed to false when provided false", function(): void {
      LocalStorageService.setHasTeachingBubbleBeenDismissed(false);

      expect(LocalStorageService.getHasTeachingBubbleBeenDismissed()).to.be.false;
    });
  });
});
