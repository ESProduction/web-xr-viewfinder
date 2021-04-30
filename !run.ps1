taskkill /F /IM "chrome.exe"
Start-Sleep -Seconds 2
$Items = @('Archived History',
            'Cache\*',
            'Cookies',
            'History',
            'Login Data',
            'Top Sites',
            'Visited Links',
            'Web Data')
$Folder = "$($env:LOCALAPPDATA)\Google\Chrome\User Data\Default"
$Items | % { 
    if (Test-Path "$Folder\$_") {
        Remove-Item "$Folder\$_" 
    }
}

Start-Process http://127.0.0.1:8080
cmd.exe /c "http-server"
