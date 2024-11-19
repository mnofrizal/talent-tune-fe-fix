import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Wifi, Check } from "lucide-react";

export function AssessmentDetails({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      assessment: {
        ...prev.assessment,
        [name]: type === "file" ? files?.[0] || null : value,
      },
    }));
  };

  const handleSelectChange = (name) => (value) => {
    setFormData((prev) => ({
      ...prev,
      assessment: {
        ...prev.assessment,
        [name]: value,
        // Reset related fields when changing metodePelaksanaan
        ...(name === "metodePelaksanaan" && {
          ruangan: value === "OFFLINE" ? "" : null,
          linkMeeting: value === "HYBRID" || value === "ONLINE" ? "" : null,
        }),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="judul">Judul</Label>
        <Input
          id="judul"
          name="judul"
          value={formData.assessment.judul}
          onChange={handleInputChange}
          placeholder="Leadership Assessment Q1 2024"
          required
        />
      </div>
      <div>
        <Label htmlFor="materi">Materi</Label>
        <Input
          id="materi"
          name="materi"
          value={formData.assessment.materi}
          onChange={handleInputChange}
          placeholder="Leadership Competency Evaluation"
          required
        />
      </div>
      <div>
        <Label htmlFor="proyeksi">Proyeksi</Label>
        <Select
          name="proyeksi"
          value={formData.assessment.proyeksi}
          onValueChange={handleSelectChange("proyeksi")}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih Proyeksi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GENERALIS_2">Generalis 2</SelectItem>
            <SelectItem value="GENERALIS_3">Generalis 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Metode Pelaksanaan</Label>
        <RadioGroup
          name="metodePelaksanaan"
          value={formData.assessment.metodePelaksanaan}
          onValueChange={handleSelectChange("metodePelaksanaan")}
          className="grid grid-cols-3 gap-4 pt-2"
        >
          <div className="relative">
            <RadioGroupItem
              value="OFFLINE"
              id="offline"
              className="peer sr-only"
            />
            <Label
              htmlFor="offline"
              className="group relative flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-105 peer-data-[state=checked]:flex">
                <Check className="h-4 w-4" />
              </div>
              <MapPin className="mb-3 h-6 w-6" />
              Offline
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem
              value="ONLINE"
              id="online"
              className="peer sr-only"
            />
            <Label
              htmlFor="online"
              className="group relative flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-105 peer-data-[state=checked]:flex">
                <Check className="h-4 w-4" />
              </div>
              <Wifi className="mb-3 h-6 w-6" />
              Online
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem
              value="HYBRID"
              id="hybrid"
              className="peer sr-only"
            />
            <Label
              htmlFor="hybrid"
              className="group relative flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="absolute -right-2 -top-2 hidden h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-105 peer-data-[state=checked]:flex">
                <Check className="h-4 w-4" />
              </div>
              <div className="mb-3 flex">
                <MapPin className="mr-1 h-6 w-6" />
                <Wifi className="h-6 w-6" />
              </div>
              Hybrid
            </Label>
          </div>
        </RadioGroup>
      </div>
      {formData.assessment.metodePelaksanaan === "OFFLINE" ? (
        <div>
          <Label htmlFor="ruangan">Ruangan</Label>
          <Select
            name="ruangan"
            value={formData.assessment.ruangan}
            onValueChange={handleSelectChange("ruangan")}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih Ruangan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ROOM_A">Meeting Room A</SelectItem>
              <SelectItem value="ROOM_B">Meeting Room B</SelectItem>
              <SelectItem value="ROOM_C">Meeting Room C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div>
          <Label htmlFor="linkMeeting">Link Meeting</Label>
          <Input
            id="linkMeeting"
            name="linkMeeting"
            value={formData.assessment.linkMeeting}
            onChange={handleInputChange}
            placeholder="https://meet.example.com/assessment"
            required={formData.assessment.metodePelaksanaan !== "OFFLINE"}
          />
        </div>
      )}
      <div>
        <Label htmlFor="notaDinas">Nota Dinas</Label>
        <div className="grid w-full items-center gap-1.5 pt-2">
          <input
            id="notaDinas"
            name="notaDinas"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleInputChange}
            className="cursor-pointer text-sm file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
          />
          <p className="text-xs text-muted-foreground">
            Accepted formats: PDF, DOC, DOCX
          </p>
          {/* {formData.assessment.notaDinas && (
            <p className="text-xs text-muted-foreground">
              Selected file: {formData.assessment.notaDinas.name}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default AssessmentDetails;
