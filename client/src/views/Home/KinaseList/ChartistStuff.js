import './animation.css';

var Chartist = require('chartist');

const useStyles = makeStyles(styles);

const Chart = ({ kinaseInfo }) => {
  const [chartData, setChartData] = useState({});

  var delays = 80,
    durations = 500;

  const options = {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    axisY: {
      low: -20,
      high: 20,
      showGrid: false,
    },

    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    axisX: {
      showGrid: false,
    },
  };

  const animation = {
    draw: function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    },
  };
  useEffect(() => {
    let needCleanUp = true;

    const apiQuery =
      `select fold_change, p_value` +
      ` from observation where substrate like '%${kinaseInfo.kinase_name}(%'` +
      ` and fold_change > -888 and p_value > -888 and p_value < 0.2 and cell_line = 'MCF-7' order by p_value`;

    if (kinaseInfo !== '') {
      // Get all kinases from DB
      CallApi(apiQuery).then((res) => {
        if (needCleanUp) {
          console.log(res);
          res.forEach(
            (ele) => (ele.p_value = Math.ceil((ele.p_value + Number.EPSILON) * 100) / 100)
          );
          res.forEach(
            (ele) =>
              (ele.fold_change =
                Math.ceil((ele.fold_change + Number.EPSILON) * 100) / 100)
          );
          res.forEach((ele) => (ele.x = ele.p_value));
          res.forEach((ele) => (ele.y = ele.fold_change));
          res.forEach((ele) => delete ele.p_value);
          res.forEach((ele) => delete ele.fold_change);
          // const foldChanges = res.map(({ fold_change }) => fold_change);
          // const pValues = res
          //   .map(({ p_value }) => p_value)
          //   .map((value) => Math.ceil((value + Number.EPSILON) * 100) / 100);

          // const combined = { labels: pValues, series: [foldChanges] };
          // console.log(combined);
          console.log(res);
          setChartData({ series: [res] });
        }
      });
    }

    // Clean-up
    return () => (needCleanUp = false);
  }, [kinaseInfo]);

  return (
    <ChartistGraph
      className='ct-chart'
      data={chartData}
      type='Line'
      options={options}
      listener={animation}
    />
  );
};
