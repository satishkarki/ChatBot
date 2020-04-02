export default class LocalStorageService {
  public static TEACHING_BUBBLE_LOCAL_STORAGE_KEY: string = "ChatBotTeachingBubbleDismissed";

  public static getHasTeachingBubbleBeenDismissed(): boolean {
    const hasTeachingBubbleBeenDismissedString: string = localStorage.getItem(
      LocalStorageService.TEACHING_BUBBLE_LOCAL_STORAGE_KEY
    );

    return hasTeachingBubbleBeenDismissedString === "true";
  }

  public static setHasTeachingBubbleBeenDismissed(value: boolean): void {
    localStorage.setItem(LocalStorageService.TEACHING_BUBBLE_LOCAL_STORAGE_KEY, value.toString());
  }
}
