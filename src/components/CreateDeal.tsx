import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  CalendarIcon,
  Upload,
  MapPin,
  DollarSign,
  Percent,
  Clock,
  Users,
  Image as ImageIcon,
  X,
  Camera,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  name: string;
}

interface CreateDealFormData {
  title: string;
  description: string;
  category: string;
  subCategory: string;
  originalPrice: string;
  discountType: "percentage" | "amount";
  discountValue: string;
  finalPrice: string;
  maxQuantity: string;
  location: string;
  highlights: string[];
  terms: string;
  validUntil: Date | undefined;
  isActive: boolean;
}

export function CreateDeal() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [currentHighlight, setCurrentHighlight] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreateDealFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      subCategory: "",
      originalPrice: "",
      discountType: "percentage",
      discountValue: "",
      finalPrice: "",
      maxQuantity: "",
      location: "",
      highlights: [],
      terms: "",
      validUntil: undefined,
      isActive: false,
    },
  });

  const {
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const watchedValues = watch();

  const categorySubcategories = {
    "Food & Dining": [
      "Restaurants",
      "Fast Food",
      "Cafes & Coffee",
      "Bakery & Desserts",
      "Pizza",
      "Asian Cuisine",
      "International Food",
      "Healthy Options",
      "Food Delivery",
      "Catering",
    ],
    "Beauty & Spa": [
      "Hair Salon",
      "Nail Salon",
      "Massage Therapy",
      "Facial Treatments",
      "Spa Packages",
      "Cosmetics",
      "Skincare",
      "Eyebrow & Lashes",
      "Men's Grooming",
      "Wellness",
    ],
    "Health & Fitness": [
      "Gym Membership",
      "Personal Training",
      "Yoga Classes",
      "Pilates",
      "Martial Arts",
      "Dance Classes",
      "Sports Equipment",
      "Nutrition Coaching",
      "Physical Therapy",
      "Wellness Programs",
    ],
    Entertainment: [
      "Movies & Cinema",
      "Concerts & Music",
      "Theater & Shows",
      "Gaming",
      "Bowling",
      "Escape Rooms",
      "Amusement Parks",
      "Museums & Galleries",
      "Comedy Shows",
      "Live Events",
    ],
    Travel: [
      "Hotels & Accommodation",
      "Flight Deals",
      "Car Rentals",
      "Vacation Packages",
      "Tours & Activities",
      "Cruises",
      "Adventure Travel",
      "City Breaks",
      "International Travel",
      "Local Experiences",
    ],
    Shopping: [
      "Fashion & Clothing",
      "Electronics",
      "Home & Garden",
      "Books & Media",
      "Sports & Outdoors",
      "Jewelry & Accessories",
      "Toys & Games",
      "Automotive",
      "Art & Crafts",
      "Gift Cards",
    ],
    Services: [
      "Professional Services",
      "Home Improvement",
      "Cleaning Services",
      "Auto Services",
      "Photography",
      "Legal Services",
      "Financial Services",
      "Pet Services",
      "Event Planning",
      "Consulting",
    ],
    Education: [
      "Online Courses",
      "Tutoring",
      "Language Learning",
      "Professional Training",
      "Certification Programs",
      "Workshops",
      "Skills Development",
      "Academic Support",
      "Test Preparation",
      "Career Development",
    ],
  };

  const categories = Object.keys(categorySubcategories);
  const subCategories = watchedValues.category
    ? categorySubcategories[
        watchedValues.category as keyof typeof categorySubcategories
      ] || []
    : [];

  // Calculate final price when original price or discount changes
  const calculateFinalPrice = () => {
    const original = parseFloat(watchedValues.originalPrice);
    const discountValue = parseFloat(watchedValues.discountValue);

    if (original > 0 && discountValue > 0) {
      let finalPrice = 0;

      if (watchedValues.discountType === "percentage") {
        finalPrice = original - original * (discountValue / 100);
      } else {
        finalPrice = original - discountValue;
      }

      finalPrice = Math.max(0, finalPrice); // Ensure price doesn't go below 0
      setValue("finalPrice", finalPrice.toFixed(2));
    }
  };

  const addHighlight = () => {
    if (
      currentHighlight.trim() &&
      !watchedValues.highlights.includes(currentHighlight.trim())
    ) {
      const newHighlights = [
        ...watchedValues.highlights,
        currentHighlight.trim(),
      ];
      setValue("highlights", newHighlights);
      setCurrentHighlight("");
    }
  };

  const removeHighlight = (highlight: string) => {
    const newHighlights = watchedValues.highlights.filter(
      (h) => h !== highlight
    );
    setValue("highlights", newHighlights);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: UploadedImage = {
            id: Date.now().toString() + file.name,
            file,
            preview: e.target?.result as string,
            name: file.name,
          };
          setUploadedImages((prev) => [...prev, newImage]);
        };
        reader.readAsDataURL(file);
      }
    });

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (imageId: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleCategoryChange = (value: string) => {
    setValue("category", value);
    setValue("subCategory", ""); // Reset subcategory when category changes
  };

  const onSubmit = (data: CreateDealFormData) => {
    console.log("Deal submitted:", data);
    console.log("Uploaded images:", uploadedImages);
    // Handle form submission here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Create New Deal</h1>
        <p className="text-muted-foreground">
          Fill out the details to create an attractive deal for customers.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="title"
                  rules={{ required: "Deal title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deal Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 50% Off Relaxing Spa Treatment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Describe your deal in detail. What's included? What makes it special?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="category"
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={handleCategoryChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="subCategory"
                    rules={{ required: "Sub category is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sub Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!watchedValues.category}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  watchedValues.category
                                    ? "Select a subcategory"
                                    : "Select category first"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories.map((subCategory) => (
                              <SelectItem key={subCategory} value={subCategory}>
                                {subCategory}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="location"
                  rules={{ required: "Location is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="Business address or area"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Pricing & Discount */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Discount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="originalPrice"
                  rules={{
                    required: "Original price is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid price",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Price</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            step="0.01"
                            className="pl-10"
                            placeholder="100.00"
                            {...field}
                            onBlur={(e) => {
                              field.onBlur(e);
                              calculateFinalPrice();
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Discount Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="percentage"
                              id="percentage"
                            />
                            <Label
                              htmlFor="percentage"
                              className="flex items-center cursor-pointer"
                            >
                              <Percent className="mr-1 h-4 w-4" />
                              Percentage
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="amount" id="amount" />
                            <Label
                              htmlFor="amount"
                              className="flex items-center cursor-pointer"
                            >
                              <DollarSign className="mr-1 h-4 w-4" />
                              Fixed Amount
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="discountValue"
                    rules={{
                      required: "Discount value is required",
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Please enter a valid discount value",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Discount Value{" "}
                          {watchedValues.discountType === "percentage"
                            ? "(%)"
                            : "($)"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            {watchedValues.discountType === "percentage" ? (
                              <Percent className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            ) : (
                              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            )}
                            <Input
                              type="number"
                              step={
                                watchedValues.discountType === "percentage"
                                  ? "1"
                                  : "0.01"
                              }
                              className="pl-10"
                              placeholder={
                                watchedValues.discountType === "percentage"
                                  ? "50"
                                  : "25.00"
                              }
                              {...field}
                              onBlur={(e) => {
                                field.onBlur(e);
                                calculateFinalPrice();
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="finalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final Price</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10 bg-muted"
                              placeholder="75.00"
                              {...field}
                              readOnly
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="maxQuantity"
                  rules={{
                    required: "Maximum quantity is required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Please enter a valid quantity",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Quantity Available</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            className="pl-10"
                            placeholder="100"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Deal Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a highlight (e.g., Free parking included)"
                    value={currentHighlight}
                    onChange={(e) => setCurrentHighlight(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addHighlight())
                    }
                  />
                  <Button type="button" onClick={addHighlight}>
                    Add
                  </Button>
                </div>

                {watchedValues.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {watchedValues.highlights.map((highlight, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-sm"
                      >
                        {highlight}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-auto p-0"
                          onClick={() => removeHighlight(highlight)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card>
              <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Enter any restrictions, limitations, or special terms for this deal..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Deal Images */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Images
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recommended: 1200x800px, JPG or PNG
                  </p>
                </div>

                {/* Image Previews */}
                {uploadedImages.length > 0 && (
                  <div className="space-y-3">
                    <Label>Uploaded Images ({uploadedImages.length})</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                            <ImageWithFallback
                              src={image.preview}
                              alt={image.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(image.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {image.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Deal Validity */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Validity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="validUntil"
                  rules={{ required: "Valid until date is required" }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Valid Until</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value
                                ? format(field.value, "PPP")
                                : "Select date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Publish Immediately</FormLabel>
                        <FormDescription>
                          Make this deal live immediately after creation
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button type="submit" className="w-full">
                {watchedValues.isActive ? "Publish Deal" : "Save as Draft"}
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Preview Deal
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
