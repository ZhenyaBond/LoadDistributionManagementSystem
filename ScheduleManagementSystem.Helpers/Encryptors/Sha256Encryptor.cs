using ScheduleManagementSystem.Helpers.Encryptors.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace ScheduleManagementSystem.Helpers.Encryptors
{
    public class Sha256Encryptor : ISha256Encryptor
    {
        public byte[] ComputeHash(string input)
        {
            SHA256CryptoServiceProvider provider = new SHA256CryptoServiceProvider();
            return provider.ComputeHash(Encoding.Unicode.GetBytes(input));
        }
    }
}
