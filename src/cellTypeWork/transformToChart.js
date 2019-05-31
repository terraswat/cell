
// Transform the data from the server into the chart format.

import { get as rxGet, set as rxSet } from 'state/rx'
import { getCatColormap } from 'color/colorCat'
import { getRangeColor } from 'color/range'
import { sizeToRadius } from 'bubble/util'

const tsvToArrays = (tsv) => {
    const lines = tsv.split('\n')
    let arrays = []
    lines.forEach(line => {
        const cols = line.split('\t')
        arrays.push(cols)
    })
    return arrays
}

const buildClusters = (data) => {
    // Find the clusters and sort them by column position.
    if (!data || !data.clusters) {
        return
    }
    // Clusters are received with positional columns,
    // cluster names, cell counts, cell type colorbar and cell type:
    //      column  cluster cell_count  bar_color   cell_type
    //      0       2       321         0           Ventricular CMs
    //      1       0       456         4
    //      2       1       344         3           Atrial CMs
    const lines = tsvToArrays(data.clusters)
    const clusterCount = lines.length - 1
    let clusters = Array.from(clusterCount)
    const colormap = getCatColormap('hexmap', clusterCount)
    lines.slice(1).forEach((line,i) => {
        clusters[line[0]] = {
            name: line[1],
            cellCount: parseFloat(line[2]),
            barColor: colormap[line[3]],
            cellType: line[4],
            color: colormap[i],
        }
    })

    return { clusters, colormap }
}

const buildGenes = (data) => {
    // Find the genes and sort them by row position.
    if (!data || !data.genes) {
        return
    }
    // Genes are received with positional rows and genes:
    //      row     gene
    //      3       ALK
    //      2       TP53
    //      ...
    let lines = tsvToArrays(data.genes).slice(1)
    let genes = Array.from(lines.length)
    lines.forEach((line) => {
        genes[line[0]] = line[1]
    })

    return genes
}

const findBubbleData = (bubbles, cluster, gene) => {
    const index = bubbles.findIndex(bubble => {
        return (bubble.gene === gene && bubble.cluster === cluster)
    })
    return bubbles[index]
}

const buildBubbles = (data) => {
    // Find the color and size values and store them with
    // cluster and gene names.
    if (!data || !data.clusters || !data.genes || !data.colors || !data.sizes) {
        return
    }
    // Save the color values along with their gene and cluster.
    // Color values are received with cluster names across the top as:
    //      Gene    0   1   2   …
    //      ALK     .5  .3  .2 …
    //      TP53    .5  .3  .2 …
    //      …
    let bubbles = []
    let line = tsvToArrays(data.colors)
    let clusters = line[0].slice(1)
    let colorRange = { min: 0, max: 0 }
    line.slice(1).forEach((line) => {
        const gene = line[0]
        line.splice(1).forEach((color,j) => {
            bubbles.push({
                cluster: clusters[j],
                gene,
                color: parseFloat(color),
            })
            colorRange.max = Math.max(color, colorRange.max)
            colorRange.min = Math.min(color, colorRange.min)
        })
    })

    // Size values are received in the same format as color values.
    line = tsvToArrays(data.sizes)
    clusters = line[0].slice(1)
    let sizeRange = { min: 0, max: 0 }
    line.slice(1).forEach((line) => {
        const gene = line[0]
        line.splice(1).forEach((size,j) => {
            const cluster = clusters[j]
            const bubble = findBubbleData(bubbles, cluster, gene)
            bubble.size = parseFloat(size)
            sizeRange.max = Math.max(size, sizeRange.max)
         })
    })
    
    // Set the radius and colorRbg now that we know the
    // color and size value ranges.
    //bubbles.forEach(bubble => {
    for (let i = 0; i < bubbles.length; i++) {
        let bubble = bubbles[i]
        bubble.colorRgb =
            getRangeColor(bubble.color, colorRange.min, colorRange.max)
        bubble.radius = sizeToRadius(bubble.size, sizeRange.min, sizeRange.max)
    }

    return bubbles
}

const transfromToChart = (data) => {
    // Transform the format from the server response to worksheet chart.
    rxSet('cellTypeWork.dims.default')
    rxSet('cellTypeWork.data.default')
    const { clusters, colormap } = buildClusters(data)
    const genes = buildGenes(data)

    // Update the dimensions now that we know the cluster and gene counts.
    let clusterCount = 0
    if (clusters) {
        clusterCount = clusters.length
    }
    let geneCount = 0
    if (genes) {
        geneCount = genes.length
    }
    let dims = rxGet('cellTypeWork.dims')
    const { colWidth, overflow, rowHeight } = dims
    dims.bubblesWidth = clusterCount * colWidth + overflow
    dims.bubblesHeight = geneCount * rowHeight + overflow
    rxSet('cellTypeWork.dims.set', { value: dims })
    
    // Update the chart data.
    rxSet('cellTypeWork.data.load', { value: {
        dataset:         data.dataset_name,
        clusterSolution: data.cluster_solution_name,
        sizeBy:          data.size_by,
        colorBy:         data.color_by,
        clusters:        clusters,
        colormap:        colormap,
        genes:           genes,
        bubbles:         buildBubbles(data),
    }})
}

export default transfromToChart

export { findBubbleData }