(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    var CELL_NEIGHBOURS_RELATIVE_COORDINATES = root.SHRI_ISLANDS.CELL_NEIGHBOURS_RELATIVE_COORDINATES;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        let counter = 0;
        let tempMap = map.map((row) => {
            return row.slice();
        });
        /**
         * @param {number[]} coordinates координаты ячейки матрицы островов
         * @returns {void} кол-во островов
         */
        const countIsland = (coordinates) => {
            if (tempMap[coordinates[0]][coordinates[1]] === 1) {
                counter++;
                deleteIsland(coordinates);
            }
        }

        /**
         * @param {number[]} coordinates координаты ячейки матрицы островов
         * @returns {void} кол-во островов
         */
  
        const deleteIsland = (coordinates) => {
                tempMap[coordinates[0]][coordinates[1]] = 0;
                getNeighbours(coordinates).forEach(neighbour => {
                    deleteIsland(neighbour);
                })
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
                countIsland([i, j]);
            }
        }
        return counter;
    }
    root.SHRI_ISLANDS.solution = solution;
})(this);
