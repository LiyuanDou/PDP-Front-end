const label_output = {
    html: `
    <div class="output_class"></div>
    <div class="confidence_intervals">
      <div class="labels"></div>
      <div class="confidences"></div>
    </div>
    `,
    init: function(opts) {},
    output: function(data) {
        this.target.find(".output_class").html(data["label"])
        this.target.find(".confidence_intervals > div").empty()
        if ("confidences" in data) {
            for (var i = 0; i < data.confidences.length; i++) {
                let c = data.confidences[i]
                let label = c["label"]
                let confidence = Math.round(c["confidence"] * 100) + "%";
                this.target.find(".labels").append(`<div class="label" title="${label}">${label}</div>`);
                this.target.find(".confidences").append(`
          <div class="confidence" style="min-width: calc(${confidence} - 12px);" title="${confidence}">${confidence}</div>`);
            }
        }
    },
    load_example_preview: function(data) {
        if ("confidences" in data) {
            for (let confidence_set of data["confidences"]) {
                if (confidence_set["label"] == data["label"]) {
                    return data["label"] + " (" + (100 * confidence_set["confidence"]).toFixed(1) + "%)";
                }
            }
        }
        return data["label"];
    },
    clear: function() {
        this.target.find(".output_class").empty();
        this.target.find(".confidence_intervals > div").empty();
    }
}