ShTIM School Website
====================

HOW TO OPEN
1. Extract this ZIP file.
2. Open the folder in Visual Studio Code.
3. Open index.html in your browser, or use the VS Code Live Server extension.
4. The website is built with HTML, CSS and a small amount of JavaScript. No build step is needed.

FILES
- index.html: website content
- style.css: layout, colors, responsive design and animations (animation rules are at the end of the file)
- script.js: mobile navigation menu, scroll reveals, number count-up, scroll progress bar

NOTES
- The school facts (600+ students, around 60–70 teachers, Grades 5–11, green spaces, rabbits and birds in the mini zoo, and entrance exams in English, Mathematics and Logic) are based on the information supplied for this project.
- The campus scenes are CSS illustrations, so the site works without needing external photo files.
- You can replace the illustrations with real school photos whenever you have them.

ANIMATIONS
- Page load: headline slides up line by line, the school photo unveils and slowly settles, then the text and buttons rise in.
- While scrolling: sections fade up one after another, the three numbers (600+, 60–70, 5–11) count up, the quote card wipes in, a thin orange progress bar runs under the header, the header gets a soft shadow, and the menu link for the section you are reading is underlined. The hero photo drifts slightly slower than the page.
- Campus scenes: the sun glows, flowers sway, bushes breathe, the rabbit hops (ears flop, eyes blink) and the birds drift.
- Hovering: links and buttons nudge their arrows, cards lift, the admission rows slide, and the "Sh" logo tilts.
- Visitors who have "reduce motion" switched on in their device settings see the site with no animation at all.
- To slow down or speed up the page-load sequence, edit the delays in the "Hero" part of the ANIMATIONS block in style.css. To turn off the photo drift, delete the heroPhoto lines in script.js.
