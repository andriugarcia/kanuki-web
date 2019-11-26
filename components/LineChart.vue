<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
    extends: Line,
    mixins: [reactiveProp],

    mounted () {
    this.renderChart(this.chartData, 
    {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
          display: false,
      },
      
      scales: {
        xAxes: [{
            type: 'time',
            time: {
                unit: 'day'
            }
        }],
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
      }
    })
  },

}
</script>