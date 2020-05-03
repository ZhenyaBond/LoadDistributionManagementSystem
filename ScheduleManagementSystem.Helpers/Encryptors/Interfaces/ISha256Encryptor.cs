namespace ScheduleManagementSystem.Helpers.Encryptors.Interfaces
{
    public interface ISha256Encryptor
    {
        byte[] ComputeHash(string input);
    }
}
