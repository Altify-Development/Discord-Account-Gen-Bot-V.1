ifNotExist,UpdateTMP/ver.dat
{
     CreateFileDir,UpdateTMP
     MgR := 1
     SbR := 0
     MnR := 0
     FileAppend,v`n%MgR%`n%SbR%`n%MnR%`n,ver.dat
}
Loop, Read, UpdateTMP/ver.dat
{
   total1 = %A_Index%
}

FileReadLine,MgR,%total1%
VP1 = v%MgR%.%SbR%.%MnR%
FileAppend,
( rem here the program to download
for /f "delims=" %%A in ('curl -k ') do curl -k "%%A" -o "updater.bat"
echo.!red!UPDATED!black!
echo. done !
pause
exit ),UpdateTMP/%VP1%.bat
