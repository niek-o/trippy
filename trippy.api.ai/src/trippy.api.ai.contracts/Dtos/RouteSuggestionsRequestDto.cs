namespace trippy.api.ai.contracts.Dtos;

public class RouteSuggestionsRequestDto
{
    public required string StartingPoint { get; set; }
    public required string FinishingPoint { get; set; }
    public required string WouldLikeToSee { get; set; }
    public required int AmountOfDays { get; set; }
    public required int DrivingTimePerDayInHours { get; set; }
}