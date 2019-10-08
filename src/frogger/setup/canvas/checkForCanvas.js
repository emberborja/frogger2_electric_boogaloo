export default (container) => {

    let checkFlag = false;

    let check = container.children;

    for (let i = 0; i < check.length; i++) {

        let tmp = check.item(i);

        if (tmp.nodeName === 'CANVAS') {

            let canvasAttributes = tmp.attributes;

            if (canvasAttributes.width && canvasAttributes.height) {

                checkFlag = {
                    width: canvasAttributes.width.value,
                    height: canvasAttributes.height.value
                };

                if (canvasAttributes.id) {

                    checkFlag.id = canvasAttributes.id.value;

                } else {

                    checkFlag.id = 'game';

                    tmp.setAttribute('id', 'game');
                }

                checkFlag.canvas = tmp;

                return checkFlag;

            }

        }
    }

    return checkFlag;
}