type NativeEvent = Event;

import {Component, Element, Event, EventEmitter, h, Host, Method, Prop, State} from '@stencil/core';
import {generatedInputNameAndId} from '@/utils';

@Component({
    tag: 'joy-dropzone',
    styleUrl: 'dropzone.scss',
    scoped: true,
})
export class Dropzone {
    @Element() host!: HTMLJoyDropzoneElement;
    private input!: HTMLInputElement;

    /** set a unique id for the input file*/
    @Prop() idDropzone?: string;
    /** Makes the dropzone disabled or not */
    @Prop() disabled = false;
    /** Makes the dropzone invalid or not */
    @Prop() invalid = false;
    /** Add accepted file formats */
    @Prop() accept = '';
    /** set MaxSize (Megabytes), default to 32 MB */
    @Prop() maxSize = 32;
    /** Add description Text */
    @Prop() descriptionText = 'Drop your file here or click here';
    /** Add description Text */
    @Prop() descriptionStrongText = 'click here';
    /** Add CTA Upload Text */
    @Prop() buttonText = 'Upload';
    /** Add CTA Cancellation Text */
    @Prop() buttonCancelText: string = 'Cancel';
    /** Add Uploading Text */
    @Prop() uploadingText: string = 'Uploading... hang tight.';
    /** Add legend/specification text */
    @Prop() legend?: string | null;
    /** Enable multiple files upload */
    @Prop() multiple = false;
    /** Add custom error message when uploaded file format is not accepted */
    @Prop() errorTextFormat = '';
    /** Add custom error message when uploaded file size is bigger than maxSize */
    @Prop() errorTextMaxSize = '';
    /** Make the dropzone in progress state or not */
    @Prop() loading = false;

    @State() focusing = false;
    @State() dragover = false;
    @State() files: File[] = [];
    @State() fileInvalid = false;

    @Event({eventName: 'joy-dropzone-cancel-upload-file'}) joyDropzoneCancelUploadFile!: EventEmitter<File[] | null>;
    @Event({eventName: 'joy-dropzone-invalidate-file'}) joyDropzoneInvalidateFile!: EventEmitter<File[] | null>;
    @Event({eventName: 'joy-dropzone-validate-file'}) joyDropzoneValidateFile!: EventEmitter<File[] | null>;
    @Event({eventName: 'joy-dropzone-remove-file'}) joyDropzoneRemoveFile!: EventEmitter<File | null>;

    /**
     * set In progress state
     * @param {boolean} loading
     * @return {Promise}
     */
    @Method()
    async isLoading(loading: boolean): Promise<void> {
        this.loading = loading;
    }

    private errorMessages: string[] = [];

    constructor() {
        this.dragoverHandler = this.dragoverHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }

    connectedCallback() {
        window.addEventListener('dragover', this.dragoverHandler);
        window.addEventListener('drop', this.dropHandler);
    }

    disconnectedCallback() {
        window.removeEventListener('dragover', this.dragoverHandler);
        window.removeEventListener('drop', this.dropHandler);
    }

    render() {
        return (
            <Host>
                <div
                    class={{
                        'joy-dropzone': true,
                        'joy-dropzone--focusing': this.focusing || this.dragover,
                        'joy-dropzone--disabled': this.disabled,
                        'joy-dropzone--invalid': this.invalid || this.fileInvalid,
                        'joy-dropzone--valid': !this.invalid && !this.disabled && !!this.files.length,
                        [this.idDropzone || generatedInputNameAndId(this.host)]: true,
                    }}
                >
                    <div class="joy-dropzone__area">
                        <input
                            id={this.idDropzone || generatedInputNameAndId(this.host)}
                            ref={(el) => (this.input = el as HTMLInputElement)}
                            name={this.idDropzone}
                            type="file"
                            accept={this.accept}
                            onChange={this.updateFile}
                            multiple={this.multiple}
                            disabled={this.disabled}
                            tabindex="-1"
                        />
                        {!this.loading && (
                            <label
                                htmlFor={this.idDropzone || generatedInputNameAndId(this.host)}
                                class={{
                                    dropzone: true,
                                    dragover: this.dragover,
                                    errored: this.fileInvalid,
                                }}
                            >
                                {!this.files.length && (
                                    <div>
                                        <p class="joy-dropzone__description">{this.descriptionText}</p>
                                        <joy-button variant="primary" icon="add" disabled={this.disabled}
                                                    onClick={this.handleClickCTA}>
                                            {this.buttonText}
                                        </joy-button>
                                    </div>
                                )}
                                {!!this.files.length && <joy-icon name="check" size="small" color="success"/>}
                                {this.files.map((file: File) => (
                                    <div class="joy-dropzone__item">
                                        <span>{file.name} </span>
                                        <joy-icon name="trash" color="grey"
                                                  onClick={(event) => this.removeFile(event, file)}></joy-icon>
                                    </div>
                                ))}
                            </label>
                        )}
                        {this.loading && (
                            <div>
                                <div class="joy-dropzone__loader">
                                    <joy-spinner color="teal"></joy-spinner>
                                </div>
                                <p class="joy-dropzone__description">{this.uploadingText}</p>
                                <joy-button type="button" onClick={this.cancelUpload} variant="ghost">
                                    {this.buttonCancelText}
                                </joy-button>
                            </div>
                        )}
                    </div>
                    {this.legend && <div class="joy-dropzone__info">{this.legend}</div>}
                    {this.errorMessages.map((errorMessage) => (
                        <div class="joy-dropzone__info">
                            <joy-form-error no-html-error-text={errorMessage}></joy-form-error>
                        </div>
                    ))}
                </div>
            </Host>
        );
    }

    private dragoverHandler(e: NativeEvent) {
        e.stopPropagation();
        e.preventDefault();
        this.dragover = this.checkEventTarget(e);
    }

    private cancelUpload() {
        this.joyDropzoneCancelUploadFile.emit();
        this.loading = false;
    }

    private checkEventTarget(e: NativeEvent) {
        return !!(e.target as HTMLElement).closest(`.${this.idDropzone}`);
    }

    private checkFileAndTriggerUpdate(files: File[]) {
        this.files = [];
        const validations = Array.from(files).map((file) => this.isFileValid(file));
        validations.forEach((validation, index) => {
            if (validation.valid) {
                if (this.multiple) {
                    this.files = [...this.files, files[index]];
                } else {
                    this.files = [files[index]];
                }
                this.clearErrorStatus();
                this.joyDropzoneValidateFile.emit(files);
            } else {
                this.fileInvalid = true;
                this.errorMessages.push(validation.message);
                this.joyDropzoneInvalidateFile.emit(files);
            }
        });
    }

    private clearErrorStatus() {
        if (this.errorMessages.length) {
            this.errorMessages = [];
        }
        this.fileInvalid = false;
    }

    private isFileValid(file: File) {
        return this.validationChecks().reduce(
            (acc, curr) => ({
                valid: acc.valid && curr.check(file),
                message: curr.check(file) ? acc.message : curr.message,
            }),
            {valid: true, message: ''},
        );
    }

    private validationChecks() {
        return [
            {
                check: (file: File) => (this.accept ? this.accept.includes(file.type) : true),
                message: this.errorTextFormat || 'The file format is invalid',
            },
            {
                check: (file: File) => file.size < this.maxSize * 1024 * 1024,
                message: this.errorTextMaxSize || `Your file exceeds the ${this.maxSize} MB size limit`,
            },
        ];
    }

    private dropHandler(e: DragEvent) {
        if (!this.checkEventTarget(e)) {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
        this.dragover = false;
        const fileList = e.dataTransfer?.files;
        if (fileList) {
            const files = this.convertFileListToFilesArray(fileList);
            files && this.checkFileAndTriggerUpdate(files);
        }
    }

    private updateFile = (e: NativeEvent) => {
        const target = e.target as HTMLInputElement & EventTarget;
        const fileList = target?.files;
        if (fileList) {
            const files = this.convertFileListToFilesArray(fileList);
            files && this.checkFileAndTriggerUpdate(files);
        }
    };

    private convertFileListToFilesArray(fileList: FileList) {
        const files = [];
        let i = 0;
        for (i; i < fileList.length; i++) {
            if (fileList.item(i)) {
                files.push(fileList.item(i) as File);
            }
        }
        return files;
    }

    private handleClickCTA = (e: NativeEvent) => {
        e.preventDefault();
        if (!this.disabled) {
            this.input.click();
        }
    };

    private removeFile = (event: NativeEvent, removedFile: File) => {
        event.preventDefault();
        this.joyDropzoneRemoveFile.emit(removedFile);
        this.files = this.files.filter((file) => file !== removedFile);
        this.clearErrorStatus();
    };
}
