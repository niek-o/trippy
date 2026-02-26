export interface RouteSuggestionRequestModel {
  startingPoint: string,
  finishingPoint: string,
  wouldLikeToSee: string[],
  amountOfDays: number,
  drivingTimePerDayInHours: number
}
