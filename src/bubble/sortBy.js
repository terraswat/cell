
// The bubble chart sort by color or size.

const sortClusters = (data, col, dir) => {
    // Sort the clusters within this solution.
    data.sort(((a, b) => {
        return (dir === 'ascending')
            ? a[col] - b[col]
            : b[col] - a[col]
        }
    ))
    return data
}

const sortSolutions = (solutions, col, dir) => {
    // Sort the solutions by cluster colors or sizes within the solution.
    const compare = (a, b) => {
        for (var i = 0; i < a.clusters.length; i++) {
            if (i > b.clusters.length - 1) {
                break;
            }
            if (a.clusters[i][col] !== b.clusters[i][col]) {
                return (dir === 'ascending')
                    ? a.clusters[i][col] - b.clusters[i][col]
                    : b.clusters[i][col] - a.clusters[i][col]
            }
        }
        return 0
    }
    solutions.sort(compare)
    return solutions
}

const sortBy = (solutions, col, dir) => {
    solutions.forEach((solution, i) => {
        // Sort the clusters within this solution.
        solutions[i].clusters =
            sortClusters(solution.clusters, col, dir)
    })
    // Sort the solutions by cluster colors or sizes within the solution.
    sortSolutions(solutions, col, dir)
}

export default sortBy
