/**
 * @desc 탑싯 강의 진도율 100% 스크립트
 * @requires 대단원, 소단원의 개수를 찾고 변수를 수정해주세요.
 * @author Jade Yeom <ysw0094@gmail.com>
 */

/**
 * TODO EDIT CHAPTER COUNT
 * @example url - http://www.e-kpc.or.kr/eduport/front/mycampus/main/mycMainGradeView.jsp?pApplyCode=1334424
 * @desc 대단원 6개, 최대소단원 13개
 */
const titleChapterCount = 6;
const subChapterCount = 13;

const KPC_ENDPOINT = "http://www.e-kpc.or.kr/eduport/front/study/progress/stdSaveProgress.jsp";

function patchDigit(number) {
    let parsedNumber = parseInt(number);
    return parsedNumber < 10 ? "0" + number : number;
}

for (let i = 1; i <= titleChapterCount; i++)
    for (let j = 1; j <= subChapterCount; j++) {
        const chapterId = `${patchDigit(i)}${patchDigit(j)}01${patchDigit(j)}`;
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${KPC_ENDPOINT}?sinf=${chapterId}`, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
    }