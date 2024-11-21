import { Component } from "@angular/core";
import { Canvas } from "@nativescript/canvas";
import { LoadEventData, Screen } from "@nativescript/core";
import SignaturePad from "signature_pad";

const PEN_COLORS = [
  "#5d9fdeff",
  "#ff5f5fff",
  "#ffbf47ff",
  "#8ac926ff",
  "#1982c4ff",
  "#6a4c93ff",
  "#db3069ff",
];

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  canvas: Canvas;
  signaturePad: SignaturePad;
  penColor = "#5d9fdeff";
  private penIndex = 1;

  onCanvasReady(args: LoadEventData) {
    this.canvas = args.object as Canvas;
    this.canvas.width = this.canvas.clientWidth * Screen.mainScreen.scale;
    this.canvas.height = this.canvas.clientHeight * Screen.mainScreen.scale;
    this.canvas
      .getContext("2d")
      .scale(Screen.mainScreen.scale, Screen.mainScreen.scale);

    this.signaturePad = new SignaturePad(
      (this.canvas as any).toHTMLCanvas(),
      {
        penColor: "#5d9fdeff",
        backgroundColor: "#f0f0f0",
      }
    );
  }

  updatePenColor() {
    this.penColor = PEN_COLORS[this.penIndex];
    this.penIndex = (this.penIndex + 1) % PEN_COLORS.length;
    this.signaturePad.penColor = this.penColor;
  }

  clearSignaturePad() {
    this.signaturePad.clear();
  }

  undoSignaturePad() {
    const data = this.signaturePad.toData();

    if (data) {
      data.pop();
      this.signaturePad.fromData(data);
    }
  }

  onWindowResize() {
    if (!this.canvas) return;

    this.canvas.width = this.canvas.clientWidth * Screen.mainScreen.scale;
    this.canvas.height = this.canvas.clientHeight * Screen.mainScreen.scale;
    this.signaturePad.clear();
  }
}
