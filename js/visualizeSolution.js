(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var CELL_NEIGHBOURS_RELATIVE_COORDINATES = root.SHRI_ISLANDS.CELL_NEIGHBOURS_RELATIVE_COORDINATES;
    var element = root.element;
    var counterLabel;
    
    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    async function visialiseSolution(map) {
        let counter = 0,
            tempMap = map.map((row) => {
                return row.slice();
            }),
            counterText = document.querySelector('.map__res');   

        counterText.innerText = counterText.innerText.replace(/[0-9]/, counter);    
        
        document.querySelectorAll('.map__cell').forEach(element => {
            element.classList.add('unvisited');
        });

        /**
         * @param {number[]} coordinates координаты ячейки матрицы островов
         * @returns {void} кол-во островов
         */
        async function countIsland (coordinates) {
            var wait;
            if (unvisited(coordinates)) {
                wait = await visualisize(coordinates);
            }
            if (tempMap[coordinates[0]][coordinates[1]] === 1) {
                incrementCounter();
                wait = await deleteIsland(coordinates);
            }
        }

        const unvisited = (coordinates) => {
            return document.querySelectorAll('.map__row')[coordinates[0]]
                            .children[coordinates[1]]
                            .classList.contains('unvisited');
        }

        const visualisize = (coordinates) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const classes = document.querySelectorAll('.map__row')[coordinates[0]]
                    .children[coordinates[1]]
                    .classList;
                    classes.remove('unvisited');
                  resolve("result");
                }, 300);
              });
        }

        /**
         * @returns {void} Увеличивает счетчик островов и меняет текст в интерфейсе
         */
        const incrementCounter = () => {
            counter++;
            counterText.innerText = counterText.innerText.replace(/[0-9]/, counter);  
        }
        
        /**
         * @param {number[]} coordinates координаты ячейки матрицы островов
         * @returns {void} кол-во островов
         */
  
        async function deleteIsland (coordinates) {
            if (unvisited(coordinates)) {
               var wait = await visualisize(coordinates);
            }   
            tempMap[coordinates[0]][coordinates[1]] = 0;
            getNeighbours(coordinates).forEach(neighbour => {
                deleteIsland(neighbour);
            });
            return true;
        }

        /**
         * @param {number} i координаты ячейки матрицы островов
         * @param {number} j координаты ячейки матрицы островов
         * @returns {number[][]} соседние ячейки, являющиеся частью острова
        */
        const getNeighbours = (coordinates) => {
            const i = coordinates[0];
            const j = coordinates[1];
            const neighbours = [];

            CELL_NEIGHBOURS_RELATIVE_COORDINATES.forEach(neighbour => {
                if(tempMap[i + neighbour[0]] && tempMap[i + neighbour[0]][j + neighbour[1]] === 1){
                    neighbours.push([i + neighbour[0], j + neighbour[1]]);
                }
            });

            return neighbours;

        }

        for (let i = 0; i < tempMap.length; i++) {
            for (let j = 0; j < tempMap[i].length; j++) {
                await countIsland([i, j]);
            }
        }
        return counter;
    }
    root.SHRI_ISLANDS.visialiseSolution = visialiseSolution;
})(this);
