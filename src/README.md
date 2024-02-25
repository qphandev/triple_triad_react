### Random Notes
TODO: sort later.

* https://stackoverflow.com/questions/7773181/git-keeps-prompting-me-for-a-password

The error message you're seeing indicates that GitHub has discontinued support for password authentication when accessing repositories over HTTPS, a change that took effect on August 13, 2021. This means you can no longer use your GitHub account password to authenticate Git operations in the command line. To fix this issue and regain the ability to push to your repositories, you'll need to switch to using a personal access token (PAT) for HTTPS-based Git operations or set up SSH authentication. Here's how you can do both:

### Using a Personal Access Token (PAT) for HTTPS:

Usually you will be prompted to put in user and password if you're trying to touch a private repo.

1. **Generate a Personal Access Token on GitHub**:
   - Go to your GitHub settings.
   - Navigate to "Developer settings" > "Personal access tokens".
   - Click "Generate new token".
   - Give your token a descriptive name, select the scopes or permissions you'd like to grant this token (for basic repository operations, select `repo`), and click "Generate token".
   - **Important**: Make sure to copy your new personal access token now. You won’t be able to see it again!

2. **Use the PAT in place of your password**:
   - When you perform Git operations that require authentication, use your GitHub username as usual, but when prompted for a password, enter the personal access token you just created instead of your GitHub password.

### Setting Up SSH Authentication:

1. **Check for existing SSH keys**:
   - First, check if you already have an SSH key pair generated on your machine. You can do this by running `ls -al ~/.ssh` in your terminal. Look for files named `id_rsa` and `id_rsa.pub` (or `id_ed25519` and `id_ed25519.pub` for ED25519 keys). If these files exist, you can skip the key generation step.

2. **Generate a new SSH key** (if necessary):
   - Run `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`, replacing `"your_email@example.com"` with your GitHub email address. When prompted to "Enter a file in which to save the key," press Enter to accept the default file location. At the prompt, enter a secure passphrase for added security.

3. **Add your SSH key to the ssh-agent**:
   - Start the ssh-agent in the background with `eval "$(ssh-agent -s)"`.
   - Add your SSH private key to the ssh-agent with `ssh-add ~/.ssh/id_rsa` (or the appropriate file name for your key).

4. **Add the SSH key to your GitHub account**:
   - Copy your SSH public key to your clipboard with `pbcopy < ~/.ssh/id_rsa.pub` on macOS, `clip < ~/.ssh/id_rsa.pub` on Windows, or `xclip -sel clip < ~/.ssh/id_rsa.pub` on Linux (you might need to install `xclip` if you're on Linux).
   - Go to GitHub, navigate to "Settings" > "SSH and GPG keys".
   - Click "New SSH key", give it a descriptive title, paste your key into the field, and click "Add SSH key".

5. **Switch your repository remote URL to SSH** (if your repository is still set to use HTTPS):
   - Run `git remote set-url origin git@github.com:username/repository.git`, replacing `username` and `repository` with your GitHub username and repository name, respectively.

After setting up either HTTPS with a PAT or SSH, you should be able to push to your GitHub repositories without encountering the password authentication error.