const chalk = require("chalk")

const primary = "#66cd32"
const secondary = "#656565"

/* eslint-disable max-len */
const logo = chalk`
{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@888@@@GGGGGGGG@@@@888@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@88@G}{hex("${primary}") CLLfftttttttttttttttffLLC}{bold.white G@88@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@@@@@@@88@}{hex("${primary}") CLfttt1tttttttttttttttttttt111ttttfL}{bold.white C@88@@@@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@@@@8@}{hex("${primary}") CLtttttttttt1tttttttttttttttttttttttttt1ttfL}{bold.white C@8@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@8@}{hex("${primary}") Cfttttttt11tttffLLC}{bold.white GG@@@@@@@@@GG}{hex("${primary}") CLLffttt11tttttttfC}{bold.white @8@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@8@}{hex("${primary}") CfttttttttttfLC}{bold.white G@8@@@@@@@@@@@@@@@@@@@@@8@G}{hex("${primary}") CLftttttt1tttf}{bold.white C@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@8@}{hex("${primary}") LttttttttttL}{bold.white G@8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8@G}{hex("${primary}") LfttttttttfC}{bold.white @@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@8G}{hex("${primary}") LttttttttfL}{bold.white G8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8G}{hex("${primary}") LfttttttttL}{bold.white @8@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@}{hex("${primary}") Lttttttttf}{bold.white G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@C}{hex("${primary}") fttttttttC}{bold.white @@@@@@@@@@@@}
{bold.white @@@@@@@@8C}{hex("${primary}") ft1tttttL}{bold.white G8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8G}{hex("${primary}") Ltttttttf}{bold.white G8@@@@@@@@@}
{bold.white @@@@@@@@}{hex("${primary}") Lt1ttt1tf}{bold.white G8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8G}{hex("${primary}") ftttttttC}{bold.white @@@@@@@@@}
{bold.white @@@@@8G}{hex("${primary}") ftttt1tfC}{bold.white 8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8}{hex("${primary}") CfttttttL}{bold.white @@@@@@@@}
{bold.white @@@@8G}{hex("${primary}") tttttttL}{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}{hex("${primary}") Lt1ttttf}{bold.white @8@@@@@}
{bold.white @@@@C}{hex("${primary}") fttttttL}{bold.white 8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8}{hex("${primary}") Lt1ttttf}{bold.white G@@@@@}
{bold.white @@8G}{hex("${primary}") fttttttC}{bold.white 8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8}{hex("${primary}") Cttttttf}{bold.white G@@@@}
{bold.white @@@}{hex("${primary}") fttttttL}{bold.white 8@@@@@@@@8@@@@@@8@@@@@@88@GGG@88@@@@@@@@@@@@88@GGG@88@@@@@@@@@@@@@@@8}{hex("${primary}") CttttttL}{bold.white 8@@@}
{bold.white @8}{hex("${primary}") CttttttL}{bold.white 8@@@@@@@@8C}{hex("${secondary}") i     t}{bold.white 8@@C}{hex("${secondary}") f1i       if}{bold.white C@@@@@@8G}{hex("${secondary}") f1i       it}{bold.white C@@@@@@@@@@@@@@8}{hex("${primary}") LttttttC}{bold.white 8@@}
{bold.white @G}{hex("${primary}") ttttttf}{bold.white G@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white G}{hex("${secondary}") Li              i}{bold.white L8@8L}{hex("${secondary}") 1              if}{bold.white @@@@@@@@@@@@@@}{hex("${primary}") ftttttt}{bold.white @@@}
{bold.white 8}{hex("${primary}") Ltttttt}{bold.white C8@@@@@@@@@8}{hex("${secondary}") L       i                  f}{bold.white C}{hex("${secondary}") t                  t}{bold.white G@@@@@@@@@@@@}{hex("${primary}") CttttttC}{bold.white 8@}
{bold.white G}{hex("${primary}") ftttttf}{bold.white @@@@@@@@@@@8}{hex("${secondary}") L          tL}{bold.white CGGGC}{hex("${secondary}") fi            1f}{bold.white CCGGC}{hex("${secondary}") f1        t}{bold.white 8@@@@@@@@@@@@}{hex("${primary}") LtttttL}{bold.white @@}
{hex("${primary}") Lf1ttttC}{bold.white 8@@@@@@@@@@8}{hex("${secondary}") L        f}{bold.white G8@@@@@@@8}{hex("${secondary}") Li        1}{bold.white C8@@@@@@@8}{hex("${secondary}") L1      i}{bold.white G8@@@@@@@@@@8C}{hex("${primary}") tttttt}{bold.white G@}
{hex("${primary}") ftttttt}{bold.white G8@@@@@@@@@@8}{hex("${secondary}") L       f}{bold.white @@@@@@@@@@@8}{hex("${secondary}") L       1}{bold.white @@@@@@@@@@@@C}{hex("${secondary}")       i}{bold.white C8@@@@@@@@@@@G}{hex("${primary}") ttttttC}{bold.white @}
{hex("${primary}") ftttttt}{bold.white G8@@@@@@@@@@8}{hex("${secondary}") L      i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white C8@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@@@G}{hex("${primary}") ttttttC}{bold.white @}
{hex("${primary}") ttttttt}{bold.white G8@@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white 8@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@@@G}{hex("${primary}") ttt1ttC}{bold.white @}
{hex("${primary}") ftttttt}{bold.white G8@@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white 8@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@@@8}{hex("${primary}") CCCLLL}{bold.white G@}
{hex("${primary}") Ltttt1t}{bold.white C8@@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white 8@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@@@@@@@@@@@@}
{hex("${primary}") CftttttL}{bold.white @@@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white 8@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@@@@@@@@@@@@}
{bold.white @}{hex("${primary}") L1ttttt}{bold.white G@@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white 8@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@@@}{hex("${secondary}") Cttf}{bold.white C8@@@}
{bold.white @}{hex("${primary}") CttttttC}{bold.white 8@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white 8@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@8}{hex("${secondary}") t     t}{bold.white @@@}
{bold.white @G}{hex("${primary}") ftttttf}{bold.white C@@@@@@@@@8}{hex("${secondary}") L      1}{bold.white 8@@@@@@@@@@@@G}{hex("${secondary}")       i}{bold.white @@@@@@@@@@@@@G}{hex("${secondary}") i     i}{bold.white C8@@@@@@@@@8}{hex("${secondary}") t     t}{bold.white @@@}
{bold.white @8G}{hex("${primary}") ttttttf}{bold.white @@@@@@@@@8G}{hex("${secondary}") t11111f}{bold.white 8@@@@@@@@@@@@@}{hex("${secondary}") t11111f}{bold.white @@@@@@@@@@@@@@}{hex("${secondary}") f11111f}{bold.white G8@@@@@@@@@@@}{hex("${secondary}") Ct1tL}{bold.white 8@@@}
{bold.white @@8}{hex("${primary}") Lttttttf}{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@8}{hex("${primary}") LttttttL}{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8@@@@@@@@@@@}
{bold.white @@@@@}{hex("${primary}") Lttttttf}{bold.white G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8G}{hex("${primary}") ftfL}{bold.white C@8@@@@@@@}
{bold.white @@@@@@}{hex("${primary}") LtttttttC}{bold.white 8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8}{hex("${primary}") Ctt11ttf}{bold.white C8@@@@@@}
{bold.white @@@@@@8}{hex("${primary}") CtttttttL}{bold.white G8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8G}{hex("${primary}") fttttttf}{bold.white C8@@@@@@@}
{bold.white @@@@@@@8G}{hex("${primary}") ftttttttL}{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}{hex("${primary}") Ltttttttf}{bold.white @@@@@@@@@@}
{bold.white @@@@@@@@@@}{hex("${primary}") Lt1ttttttL}{bold.white @8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8@}{hex("${primary}") LtttttttfC}{bold.white 8@@@@@@@@@@}
{bold.white @@@@@@@@@@8G}{hex("${primary}") Lt1ttttttL}{bold.white G@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8G}{hex("${primary}") Lttttt1ttL}{bold.white @@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@8G}{hex("${primary}") Lt1tttttttL}{bold.white G@8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@8@G}{hex("${primary}") Ltttttt1tfL}{bold.white @8@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@8@}{hex("${primary}") LttttttttttfC}{bold.white G@8@@@@@@@@@@@@@@@@@@@@@@@@@@@8@G}{hex("${primary}") CftttttttttfC}{bold.white @@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@C}{hex("${primary}") Ltttttttt1ttfLC}{bold.white G@@8888@@@@@@@@@8888@@G}{hex("${primary}") CLftttttttt1tfL}{bold.white G8@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@@8@C}{hex("${primary}") LtttttttttttttttffLLL}{bold.white CCCCC}{hex("${primary}") LLLffttttt1ttttttttfL}{bold.white G@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@@@@@8@GC}{hex("${primary}") ftttt1ttttttt1ttt111t1tttttttttt11tttfLC}{bold.white @8@@@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@8@}{hex("${primary}") CLLftttttttttttttttttttttttttfLC}{bold.white G@8@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
{bold.white @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@88@@GCC}{hex("${primary}") LfffftttttfffLLC}{bold.white GG@@8@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@}
`
/* eslint-enable max-len */

const toConsole = () => console.log(logo)

module.exports = toConsole
module.exports = { logo, primary }
